namespace API_Lisam.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddClientTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Clients",
                c => new
                    {
                        ClientId = c.Int(nullable: false, identity: true),
                        Company_Name = c.String(),
                        Street = c.String(),
                        ZipCode = c.String(),
                        City = c.String(),
                        Address = c.String(),
                        Email = c.String(),
                        Number = c.String(),
                        Language = c.String(),
                        
                    })
                .PrimaryKey(t => t.ClientId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Clients");
        }
    }
}
