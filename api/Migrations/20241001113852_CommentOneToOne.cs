using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class CommentOneToOne : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5ae4da42-7c84-475b-bc67-7b7c9e42c31e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "bd8f68a4-4b4a-437b-a775-2cf9e3d987bd");

            migrationBuilder.AddColumn<string>(
                name: "AppUserId",
                table: "Comments",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "0dbbe157-ace1-4047-aaa4-8e37ff79f1d2", null, "Admin", "ADMIN" },
                    { "1e4692b2-14de-46a1-936f-07f024c216d6", null, "User", "USER" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_AppUserId",
                table: "Comments",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Comments_AspNetUsers_AppUserId",
                table: "Comments",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Comments_AspNetUsers_AppUserId",
                table: "Comments");

            migrationBuilder.DropIndex(
                name: "IX_Comments_AppUserId",
                table: "Comments");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "0dbbe157-ace1-4047-aaa4-8e37ff79f1d2");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1e4692b2-14de-46a1-936f-07f024c216d6");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Comments");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5ae4da42-7c84-475b-bc67-7b7c9e42c31e", null, "Admin", "ADMIN" },
                    { "bd8f68a4-4b4a-437b-a775-2cf9e3d987bd", null, "User", "USER" }
                });
        }
    }
}
