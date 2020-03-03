namespace API_Lisam.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ModifyForeignKey : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Clients", "ProjectId", "dbo.Projects");
            DropIndex("dbo.Clients", new[] { "ProjectId" });
            AddColumn("dbo.Projects", "ClientId", c => c.Int());
            CreateIndex("dbo.Projects", "ClientId");
            AddForeignKey("dbo.Projects", "ClientId", "dbo.Clients", "ClientId", cascadeDelete: true);
            DropColumn("dbo.Clients", "ProjectId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Clients", "ProjectId", c => c.Int());
            DropForeignKey("dbo.Projects", "ClientId", "dbo.Clients");
            DropIndex("dbo.Projects", new[] { "ClientId" });
            DropColumn("dbo.Projects", "ClientId");
            CreateIndex("dbo.Clients", "ProjectId");
            AddForeignKey("dbo.Clients", "ProjectId", "dbo.Projects", "ProjectId", cascadeDelete: false);
        }
    }
}
