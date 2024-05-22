using Microsoft.EntityFrameworkCore;
using DiplomApi.Models.Entities;

namespace DiplomApi.Repositories;

public class ChangeTypeRepository(DbContext context, DbSet<ChangeType> dbSet) : BaseRepository<ChangeType>(context, dbSet)
{
}
