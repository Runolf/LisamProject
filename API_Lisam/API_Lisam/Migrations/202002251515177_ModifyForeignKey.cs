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
            AddColumn("dbo.Projects", "ClientId", c => c.Int(nullable: true));
            CreateIndex("dbo.Projects", "ClientId");
            //AddForeignKey("dbo.Projects", "ClientId", "dbo.Clients", "ClientId", cascadeDelete: true); Do not use this code because it do not put FK with on update -> cascade and on delete set null
            Sql("ALTER TABLE [dbo].[Projects]  WITH CHECK ADD  CONSTRAINT [FK_dbo.Projects_dbo.Clients_ClientId] FOREIGN KEY([ClientId]) REFERENCES[dbo].[Clients]([ClientId]) ON UPDATE CASCADE ON DELETE SET NULL");
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
