using Microsoft.EntityFrameworkCore.Migrations;

namespace RestaurantAPI.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Clients",
                columns: table => new
                {
                    ClientID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ClientNom = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Clients", x => x.ClientID);
                });

            migrationBuilder.CreateTable(
                name: "Nourritures",
                columns: table => new
                {
                    NourritureId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NourritureItemName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    Prix = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Nourritures", x => x.NourritureId);
                });

            migrationBuilder.CreateTable(
                name: "CommandeMains",
                columns: table => new
                {
                    CommandeMId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CommandeNumber = table.Column<string>(type: "nvarchar(75)", nullable: true),
                    ClientId = table.Column<int>(type: "int", nullable: false),
                    PaimentM = table.Column<string>(type: "nvarchar(10)", nullable: true),
                    FTotal = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommandeMains", x => x.CommandeMId);
                    table.ForeignKey(
                        name: "FK_CommandeMains_Clients_ClientId",
                        column: x => x.ClientId,
                        principalTable: "Clients",
                        principalColumn: "ClientID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CommandeDetails",
                columns: table => new
                {
                    CommandeDetailId = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    
                    FoodItemId = table.Column<int>(type: "int", nullable: false),
                    FoodItemPrice = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    CommandeMId = table.Column<long>(type: "bigint", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommandeDetails", x => x.CommandeDetailId);
                    table.ForeignKey(
                        name: "FK_CommandeDetails_CommandeMains_CommandeMId",
                        column: x => x.CommandeMId,
                        principalTable: "CommandeMains",
                        principalColumn: "CommandeMId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CommandeDetails_Nourritures_NourritureId",
                        column: x => x.FoodItemId,
                        principalTable: "Nourritures",
                        principalColumn: "NourritureId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CommandeDetails_CommandeMId",
                table: "CommandeDetails",
                column: "CommandeMId");

            migrationBuilder.CreateIndex(
                name: "IX_CommandeDetails_FoodItemId",
                table: "CommandeDetails",
                column: "FoodItemId");

            migrationBuilder.CreateIndex(
                name: "IX_CommandeMains_ClientId",
                table: "CommandeMains",
                column: "ClientId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CommandeDetails");

            migrationBuilder.DropTable(
                name: "CommandeMains");

            migrationBuilder.DropTable(
                name: "Nourritures");

            migrationBuilder.DropTable(
                name: "Clients");
        }
    }
}
