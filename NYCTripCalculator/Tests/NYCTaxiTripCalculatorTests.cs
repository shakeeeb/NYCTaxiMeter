using Microsoft.VisualStudio.TestTools.UnitTesting;
using NYCTaxiMeter.Helpers.Concrete;
using NYCTaxiMeter.Models.Concrete;
using System;

namespace Tests
{
    [TestClass]
    public class NYCTaxiTripCalculatorTests
    {

        [TestMethod]
        public void CaclulatePrice_CalculatesPrice_ReturnsTotal()
        {
            // Arrange
            NYCTaxiTripModel _mock = new NYCTaxiTripModel()
            {
                TripId = new System.Guid(),
                NumberOfMinutesTraveledAboveThreshold = 5,
                NumberOfMilesTraveledBelowThreshold = 2,
                StartTime = DateTime.Parse("2010-10-08 17:30:00"),
                NumberOfUnits = 1
            };

            var calculator = new NYCTaxiTripCalculator();

            // Act
            var price = calculator.CalculatePrice(_mock);

            // Assert
            Assert.AreEqual(9.75m, price);
        }
    }
}
