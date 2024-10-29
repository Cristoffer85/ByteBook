using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class AddFavouritePetToAppUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "da5a83e6-3c80-447a-aee9-cafe5ed7796e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "ddf5a04c-adeb-4311-b0a1-efdc851c5558");

            migrationBuilder.AddColumn<string>(
                name: "FavouritePet",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "aadf9103-160c-48e4-82b6-a7b86cc1c993", null, "Admin", "ADMIN" },
                    { "dcd2e7b5-afd4-4472-81dd-8a946d975504", null, "User", "USER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "aadf9103-160c-48e4-82b6-a7b86cc1c993");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dcd2e7b5-afd4-4472-81dd-8a946d975504");

            migrationBuilder.DropColumn(
                name: "FavouritePet",
                table: "AspNetUsers");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "da5a83e6-3c80-447a-aee9-cafe5ed7796e", null, "Admin", "ADMIN" },
                    { "ddf5a04c-adeb-4311-b0a1-efdc851c5558", null, "User", "USER" }
                });
        }
    }
}
