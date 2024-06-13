using Microsoft.EntityFrameworkCore;
using DiplomApi.Models.Entities;

namespace DiplomApi.Repositories;

public class UserPlaceRepository(DbContext context, DbSet<UserPlace> dbSet) : BaseCompositeKeyRepository<UserPlace>(context, dbSet)
{
    public override void Insert(UserPlace entity)
    {
        var product = _context.Set<Place>().Find(entity.PlaceId) ?? throw new ArgumentException("Place does not exist.");
        var user = _context.Set<User>().Find(entity.UserId) ?? throw new ArgumentException("User does not exist.");
        base.Insert(entity);
    }
}
