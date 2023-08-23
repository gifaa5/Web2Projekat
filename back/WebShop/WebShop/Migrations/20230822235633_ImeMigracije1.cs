using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebShop.Migrations
{
    /// <inheritdoc />
    public partial class ImeMigracije1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderTime",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 8, 23, 1, 56, 33, 56, DateTimeKind.Local).AddTicks(7813),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 8, 23, 1, 45, 48, 871, DateTimeKind.Local).AddTicks(1289));

            migrationBuilder.UpdateData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DeliveryTime", "OrderTime" },
                values: new object[] { new DateTime(2023, 8, 23, 4, 43, 33, 58, DateTimeKind.Local).AddTicks(450), new DateTime(2023, 8, 23, 1, 56, 33, 56, DateTimeKind.Local).AddTicks(7813) });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Amount", "Description", "Image", "Name", "Price", "SellerId" },
                values: new object[] { 1, 10, "123", null, "Test", 100.0, 2 });

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                column: "Password",
                value: "$2a$10$poJPkM2M2Pt9UUz8XzFIVONNYQ9TQJW99Gk6OzWLa1a20MUQj/3nS");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 2,
                column: "Password",
                value: "$2a$10$sWTxXJZ9b2lnmHo2olCK/uIkk9oVTRTJS6WB2pYPBEZB45qEUTF3u");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 3,
                column: "Password",
                value: "$2a$10$9gGVn2vLK1m/NYCVet89IuH7BLCtXgekowD0qWsOSxR5qTmOlFX8.");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.AlterColumn<DateTime>(
                name: "OrderTime",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2023, 8, 23, 1, 45, 48, 871, DateTimeKind.Local).AddTicks(1289),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2023, 8, 23, 1, 56, 33, 56, DateTimeKind.Local).AddTicks(7813));

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
    }
}
