using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace API_Lisam.Models
{
    public class LisamContext: DbContext
    {
        // to contact the API = http://localhost:44331/
        public DbSet<Client>Clients { get; set; }
        public DbSet<Project>Projects { get; set; }
        public LisamContext() : base("name=DefaultConnection") { }
        //public LisamContext() : base("name=House") { }
        //public LisamContext() : base("name=HouseFix") { }

        
        //protected override void OnModelCreating(DbModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<Project>()
        //        .HasOptional(j => j.Client)
        //        .WithMany()
        //        .WillCascadeOnDelete();
        //    base.OnModelCreating(modelBuilder);

        //}
        
         
    }
}