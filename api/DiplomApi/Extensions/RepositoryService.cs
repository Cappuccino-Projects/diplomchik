using DiplomApi.Contexts;
using DiplomApi.Interfaces;

namespace DiplomApi.Extensions;

public static class RepositoryService
{
    public static IServiceCollection AddRepository<TU, TV>(this IServiceCollection services) 
        where TU : class 
        where TV : class, IRepository<TU>
    {
        services.AddScoped<IRepository<TU>, TV>(options =>
        {
            var dbContext = options.GetRequiredService<TrashBinsContext>();
            var args = new object[] { dbContext, dbContext.Set<TU>() };
            return (TV)Activator.CreateInstance(typeof(TV), args)! 
                   ?? throw new InvalidOperationException();
        });
        
        return services;
    }

    public static IServiceCollection AddCompositeKeyRepository<TU, TV>(this IServiceCollection services)
        where TU : class
        where TV : class, ICompositeKeyRepository<TU>
    {
        services.AddScoped<ICompositeKeyRepository<TU>, TV>(options =>
        {
            var dbContext = options.GetRequiredService<TrashBinsContext>();
            var args = new object[] { dbContext, dbContext.Set<TU>() };
            return (TV)Activator.CreateInstance(typeof(TV), args)!
                   ?? throw new InvalidOperationException();
        });

        return services;
    }
}