using Microsoft.EntityFrameworkCore;
using DiplomApi.Models.Entities;

namespace DiplomApi.Repositories;

public class RankRepository(DbContext context, DbSet<Rank> dbSet) : BaseRepository<Rank>(context, dbSet)
{
}
