using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantAPI.Migrations
{
    public partial class SecondCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CommandeDetails_Nourritures_FoodItemId",
                table: "CommandeDetails");

            migrationBuilder.RenameColumn(
                name: "NourritureItemName",
                table: "Nourritures",
                newName: "NourritureNom");

            migrationBuilder.RenameColumn(
                name: "Quantity",
                table: "CommandeDetails",
                newName: "Quantite");

            migrationBuilder.RenameColumn(
                name: "FoodItemPrice",
                table: "CommandeDetails",
                newName: "NourriturePrix");

            migrationBuilder.RenameColumn(
                name: "FoodItemId",
                table: "CommandeDetails",
                newName: "NourritureId");

            migrationBuilder.RenameIndex(
                name: "IX_CommandeDetails_FoodItemId",
                table: "CommandeDetails",
                newName: "IX_CommandeDetails_NourritureId");

            migrationBuilder.AddForeignKey(
                name: "FK_CommandeDetails_Nourritures_NourritureId",
                table: "CommandeDetails",
                column: "NourritureId",
                principalTable: "Nourritures",
                principalColumn: "NourritureId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CommandeDetails_Nourritures_NourritureId",
                table: "CommandeDetails");

            migrationBuilder.RenameColumn(
                name: "NourritureNom",
                table: "Nourritures",
                newName: "NourritureItemName");

            migrationBuilder.RenameColumn(
                name: "Quantite",
                table: "CommandeDetails",
                newName: "Quantity");

            migrationBuilder.RenameColumn(
                name: "NourriturePrix",
                table: "CommandeDetails",
                newName: "FoodItemPrice");

            migrationBuilder.RenameColumn(
                name: "NourritureId",
                table: "CommandeDetails",
                newName: "FoodItemId");

            migrationBuilder.RenameIndex(
                name: "IX_CommandeDetails_NourritureId",
                table: "CommandeDetails",
                newName: "IX_CommandeDetails_FoodItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_CommandeDetails_Nourritures_FoodItemId",
                table: "CommandeDetails",
                column: "FoodItemId",
                principalTable: "Nourritures",
                principalColumn: "NourritureId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
