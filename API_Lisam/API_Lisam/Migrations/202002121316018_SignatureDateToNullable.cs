namespace API_Lisam.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class SignatureDateToNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Projects", "SignatureDate", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Projects", "SignatureDate", c => c.DateTime(nullable: false));
        }
    }
}
