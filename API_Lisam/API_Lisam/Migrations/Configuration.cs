namespace API_Lisam.Migrations
{
    using API_Lisam.Models;
    using System;
    using System.Collections.ObjectModel;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<API_Lisam.Models.LisamContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(API_Lisam.Models.LisamContext context)
        {
            context.Projects.AddOrUpdate(p => p.ProjectNumber,
               new Models.Project
               {
                   ProjectLeader = "Jean-François Licausi",
                   ProjectNumber = "01",
                   SignatureDate = new DateTime(2020, 02, 11),
                   Clients = new Collection<Client>()
                   {
                            new Client()
                            {
                                 Company_Name = "Lisam",
                                 Email = "lisam@hotmail.com",
                                 Number = "067 49 00 03",
                                 City = "Ecaussinnes",
                                 Street = "Rue Jean Jaurès",
                                 ZipCode = "7190",
                                 Language = "French"
                            }
                   }
               }

           );
        }
    }
}
