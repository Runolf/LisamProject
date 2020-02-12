namespace API_Lisam.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SetStatutsToNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Projects", "Statut", c => c.Int());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Projects", "Statut", c => c.Int(nullable: false));
        }
    }
}
