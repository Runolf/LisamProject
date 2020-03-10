namespace API_Lisam.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addIsActiveToBothModels : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Clients", "IsActive", c => c.Boolean(nullable: false, defaultValue: true ));
            AddColumn("dbo.Projects", "IsActive", c => c.Boolean(nullable: false, defaultValue: true));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Projects", "IsActive");
            DropColumn("dbo.Clients", "IsActive");
        }
    }
}
