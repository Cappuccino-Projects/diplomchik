using Microsoft.EntityFrameworkCore;
using DiplomApi.Models.Entities;

namespace DiplomApi.Repositories;

public class ChangeRepository(DbContext context, DbSet<Change> dbSet) : BaseRepository<Change>(context, dbSet)
{
    public override void Insert(Change entity)
    {
        var user = _context.Set<User>().Find(entity.UserId) ?? throw new ArgumentException("User does not exist.");
        var place = _context.Set<Place>().Find(entity.PlaceId) ?? throw new ArgumentException("Place does not exist.");
        var type = _context.Set<ChangeType>().Find(entity.TypeId) ?? throw new ArgumentException("Type does not exist.");
        base.Insert(entity);
    }
}
