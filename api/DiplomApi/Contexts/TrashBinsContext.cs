﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;
using DiplomApi.Models.Entities;

namespace DiplomApi.Contexts;

public partial class TrashBinsContext : DbContext
{
    public TrashBinsContext()
    {
    }

    public TrashBinsContext(DbContextOptions<TrashBinsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<Mission> Missions { get; set; }

    public virtual DbSet<MissionUser> MissionsUsers { get; set; }

    public virtual DbSet<Place> Places { get; set; }

    public virtual DbSet<PlaceType> PlaceTypes { get; set; }

    public virtual DbSet<Product> Products { get; set; }

    public virtual DbSet<ProductType> ProductTypes { get; set; }

    public virtual DbSet<Rank> Ranks { get; set; }

    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<Status> Statuses { get; set; }

    public virtual DbSet<Theme> Themes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    public virtual DbSet<UserProduct> UsersProducts { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseMySql("server=localhost;user=root;password=root;database=all_places", ServerVersion.Parse("5.7.24-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<MissionUser>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.MissionId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
        });

        
        modelBuilder.Entity<UserProduct>(entity =>
        {
            entity.HasKey(e => new { e.UserId, e.ProductId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
