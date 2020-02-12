namespace API_Lisam.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddPropForeignKeyToClientModel : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Clients", "Project_ProjectId", "dbo.Projects");
            DropIndex("dbo.Clients", new[] { "Project_ProjectId" });
            RenameColumn(table: "dbo.Clients", name: "Project_ProjectId", newName: "ProjectId");
            AlterColumn("dbo.Clients", "ProjectId", c => c.Int(nullable: true));
            CreateIndex("dbo.Clients", "ProjectId");
            AddForeignKey("dbo.Clients", "ProjectId", "dbo.Projects", "ProjectId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Clients", "ProjectId", "dbo.Projects");
            DropIndex("dbo.Clients", new[] { "ProjectId" });
            AlterColumn("dbo.Clients", "ProjectId", c => c.Int(nullable: false));
            RenameColumn(table: "dbo.Clients", name: "ProjectId", newName: "Project_ProjectId");
            CreateIndex("dbo.Clients", "Project_ProjectId");
            AddForeignKey("dbo.Clients", "Project_ProjectId", "dbo.Projects", "ProjectId");
        }
    }
}
