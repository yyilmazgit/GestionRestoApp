using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantAPI.Migrations
{
    public partial class ThirdCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CommandeDetails_CommandeMains_CommandeMId",
                table: "CommandeDetails");

            migrationBuilder.DropColumn(
                name: "OrderMasterId",
                table: "CommandeDetails");

            migrationBuilder.AlterColumn<long>(
                name: "CommandeMId",
                table: "CommandeDetails",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_CommandeDetails_CommandeMains_CommandeMId",
                table: "CommandeDetails",
                column: "CommandeMId",
                principalTable: "CommandeMains",
                principalColumn: "CommandeMId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CommandeDetails_CommandeMains_CommandeMId",
                table: "CommandeDetails");

            migrationBuilder.AlterColumn<long>(
                name: "CommandeMId",
                table: "CommandeDetails",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<long>(
                name: "OrderMasterId",
                table: "CommandeDetails",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddForeignKey(
                name: "FK_CommandeDetails_CommandeMains_CommandeMId",
                table: "CommandeDetails",
                column: "CommandeMId",
                principalTable: "CommandeMains",
                principalColumn: "CommandeMId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
