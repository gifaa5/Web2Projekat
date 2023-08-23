using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebShop.Migrations
{
    /// <inheritdoc />
    public partial class ImeMigracije : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderTime",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 8, 23, 1, 45, 48, 871, DateTimeKind.Local).AddTicks(1289),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 8, 16, 16, 23, 14, 72, DateTimeKind.Local).AddTicks(5612));

            migrationBuilder.AlterColumn<double>(
                name: "Price",
                table: "Item",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "ProductId",
                table: "Item",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Price", "ProductId" },
                values: new object[] { 100.0, 1 });

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DeliveryTime", "OrderTime" },
                values: new object[] { new DateTime(2023, 8, 23, 4, 9, 48, 871, DateTimeKind.Local).AddTicks(5352), new DateTime(2023, 8, 23, 1, 45, 48, 871, DateTimeKind.Local).AddTicks(1289) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$10$SA..juCeFpn0FfNNh0RmYu1Mg096mkjokdKgbd9OTOVt50T9R6Cjy");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$10$yTwQlBlALUYTEXFBiJW0D.QVoysA/h.imt8tg/9sD5VxnTBBMJvcW");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$10$1cARKd5fDgxr8NSbJO587.d1wPRcZGH.fI4qGxJTRFDolOHupuPNu");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProductId",
                table: "Item");

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderTime",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 8, 16, 16, 23, 14, 72, DateTimeKind.Local).AddTicks(5612),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 8, 23, 1, 45, 48, 871, DateTimeKind.Local).AddTicks(1289));

            migrationBuilder.AlterColumn<int>(
                name: "Price",
                table: "Item",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.UpdateData(
                table: "Item",
                keyColumn: "Id",
                keyValue: 1,
                column: "Price",
                value: 100);

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DeliveryTime", "OrderTime" },
                values: new object[] { new DateTime(2023, 8, 16, 18, 24, 14, 73, DateTimeKind.Local).AddTicks(301), new DateTime(2023, 8, 16, 16, 23, 14, 72, DateTimeKind.Local).AddTicks(5612) });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$10$Exf7kYuDc5Ft2Wnna999qeeeK6.ZfvAfZnspLwrMy7U/OU0Kcv68C");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$10$EgBqD9GdnYAzc6vowBfurOBz0UH705ZzKCG/56x43gn.JIHIJATqK");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$10$9vrb.tAT56FrocNww9EyjOZZ.zejCEPW3EqcCDFW.b2Y886Xh6v.e");
        }
    }
}
