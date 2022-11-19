using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using Application.Core;
using Microsoft.AspNetCore.Http.Json;

namespace API.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionMiddleware> _logger;
        public IHostEnvironment Env { get; }
        public ExceptionMiddleware(RequestDelegate next,ILogger<ExceptionMiddleware> logger, IHostEnvironment env)
        {
            Env = env;
            _logger = logger;
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex,ex.Message);
                context.Response.ContentType = "application/json";
                context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;

                var exception = Env.IsDevelopment() ? 
                    new AppException(context.Response.StatusCode,ex.Message,ex.StackTrace)
                    :new AppException(context.Response.StatusCode,"Internal server error");
                
                var jsonOption = new JsonSerializerOptions{PropertyNamingPolicy=JsonNamingPolicy.CamelCase};
                var json = JsonSerializer.Serialize(exception,jsonOption);
                await context.Response.WriteAsync(json);
            }
        }
    }
}