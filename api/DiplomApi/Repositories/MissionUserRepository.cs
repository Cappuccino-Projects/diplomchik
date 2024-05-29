using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Metrics;
using DiplomApi.Models.Entities;

namespace DiplomApi.Repositories;

public class MissionUserRepository(DbContext context, DbSet<MissionUser> dbSet) : BaseRepository<MissionUser>(context, dbSet)
{
    public override void Insert(MissionUser entity)
    {
        var mission = _context.Set<Mission>().Find(entity.MissionId) ?? throw new ArgumentException("Mission does not exist.");
        var user = _context.Set<User>().Find(entity.UserId) ?? throw new ArgumentException("User does not exist.");
        base.Insert(entity);
    }

    public override void Delete(int id) => throw new NotSupportedException();

    public void Delete(int missionId, int userId)
    {
        var entity = _dbSet.Find(missionId, userId);
        if (entity == null)
            return;

        _dbSet.Remove(entity);
        _context.SaveChanges();
    }
}
