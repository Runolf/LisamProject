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

        /*
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>()
                .HasMany(c => c.Clients)
                .WithRequired(p => p.Project)
                .HasForeignKey(fk => fk.ProjectId);

            base.OnModelCreating(modelBuilder);

        }
        
         */
    }
}