using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using NYCTaxiMeter.Helpers.Abstract;
using NYCTaxiMeter.Helpers.Concrete;
using NYCTaxiMeter.Models.Concrete;
using NYCTripCalculator.Models.Concrete;

namespace NYCTaxiMeter.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NYCTripCalculationController : ControllerBase
    {
        private ITripCalculator<NYCTaxiTripModel> _calculator = new NYCTaxiTripCalculator();

        private readonly ILogger<NYCTripCalculationController> _logger;

        public NYCTripCalculationController(ILogger<NYCTripCalculationController> logger)
        {
            _logger = logger;
        }

        //// GET: api/NYCTripCalculation
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/NYCTripCalculation/5
        //[HttpGet("{id}", Name = "GetById")]
        //public string Get(int id)
        //{ 
        //    return "value";
        //}

        // GET: api/NYCTripCalculation/GetPrice
        //[HttpGet("GetPrice", Name = "GetPrice")]
        //public PriceModel GetPrice([FromBody] NYCTaxiTripModel model)
        //{
        //    // does calculation based on model here
        //    var price =  _calculator.CalculatePrice(model);
        //    return new PriceModel(){ Price = price, TripId = model.TripId };
        //}

        [HttpPost("PostPrice", Name = "PostPrice")]
        public PriceModel PostPrice([FromBody] NYCTaxiTripModel model)
        {
            // Does calculation based on model here.
            var price = _calculator.CalculatePrice(model);
            return new PriceModel() { Price = price, TripId = model.TripId };
        }
    }
}
