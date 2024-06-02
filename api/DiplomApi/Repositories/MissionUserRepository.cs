using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using DiplomApi.Models.Entities;

namespace DiplomApi.Repositories;

public class MissionUserRepository(DbContext context, DbSet<MissionUser> dbSet) : BaseCompositeKeyRepository<MissionUser>(context, dbSet)
{
    public override void Insert(MissionUser entity)
    {
        var mission = _context.Set<Mission>().Find(entity.MissionId) ?? throw new ArgumentException("Mission does not exist.");
        var user = _context.Set<User>().Find(entity.UserId) ?? throw new ArgumentException("User does not exist.");
        base.Insert(entity);
    }
}
