namespace API_Lisam.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddProjectTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        ProjectId = c.Int(nullable: false, identity: true),
                        SignatureDate = c.DateTime(nullable: false),
                        ProjectNumber = c.String(),
                        ProjectLeader = c.String(),
                        Statut = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectId);
            
            AddColumn("dbo.Clients", "Project_ProjectId", c => c.Int());
            CreateIndex("dbo.Clients", "Project_ProjectId");
            AddForeignKey("dbo.Clients", "Project_ProjectId", "dbo.Projects", "ProjectId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Clients", "Project_ProjectId", "dbo.Projects");
            DropIndex("dbo.Clients", new[] { "Project_ProjectId" });
            DropColumn("dbo.Clients", "Project_ProjectId");
            DropTable("dbo.Projects");
        }
    }
}
