using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace API_Lisam.Models
{
    public class LisamContext: DbContext
    {
        public DbSet<Client>Clients { get; set; }
        public DbSet<Project>Projects { get; set; }
        public LisamContext():base("name=DefaultConnection")
        {

        }
    }
}