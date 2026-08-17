import React, { useState, useMemo } from 'react'

const CinemaSeatBooking = ({
  layout= {
    rows: 8,
    seatsPerRow: 12,
    aislePosition: 5,
  },
  seatTypes = {
    regular: {name: 'Regular', price: 150, rows: [0, 1, 2] },
    premium: {name: 'Premium', price: 250, rows: [3, 4, 5] },
    vip: {name: 'VIP', price: 350, rows: [6, 7] },

  },
  bookedSeats = [],
  currency = '$',
  onBookingComplete = () => {},
  title = 'Cinema Hall Booking',
  subtitle = 'Select your prefered sests',
}) => {
  const colors = [
    'blue',
    'purple',
    'yellow',
    'green',
    'red',
    'pink',
  ]

  const getSeatType = (rowIndex) => {
  const seatTypeEntries = Object.entries(seatTypes);

  for (let i = 0; i < seatTypeEntries.length; i++) {
    const [type, config] = seatTypeEntries[i];

    if (config.rows.includes(rowIndex)) {
      const color = colors[i % colors.length];
      return { type, color, ...config };
    }
  }

  // fallback
  const [firstType, firstConfig] = seatTypeEntries[0];
  return { type: firstType, color: colors[0], ...firstConfig };
};

  
  const initializeSeats = useMemo(() => {
    const seats = [];
    for (let row = 0; row < layout.rows; row++){
      const seatRow = [];
      const seatTypeInfo = getSeatType(row);

      for(let seat = 0; seat < layout.seatsPerRow; seat++){
        const seatId = `${String.fromCharCode(65 + row)}${seat + 1}`;

        seatRow.push({
          id: seatId,
          row,
          seat,
          type: seatTypeInfo?.type || "regular",
          price: seatTypeInfo?.price || 10,
          color: seatTypeInfo?.color || "blue",
          status: bookedSeats.includes(seatId) ? "booked" : "available",
          selected: false,  
        });
      }
      seats.push(seatRow);
    }
    return seats;
  }, [layout, seatTypes, bookedSeats]);

  const [seats, setSeats] = useState(initializeSeats);
  const [selectedSeats, setSelectedSeats] = useState([]);

  const getColorClass = (colorName) => {
  const colorMap = {
    blue:   "bg-blue-100 border-blue-300 text-blue-800",
    purple: "bg-purple-100 border-purple-300 text-purple-800",
    yellow: "bg-yellow-100 border-yellow-300 text-yellow-800",
    green:  "bg-green-100 border-green-300 text-green-800",
    red:    "bg-red-100 border-red-300 text-red-800",
    pink:   "bg-pink-100 border-pink-300 text-pink-800",
  };
  return colorMap[colorName] || colorMap.blue;
};

const getSeatClassName = (seat) => {
  const base = "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 m-1 rounded-t border-2 transition-all duration-200 flex justify-center items-center text-xs sm:text-sm font-bold";

  if (seat.status === "booked") {
    return `${base} bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed`;
  }

  if (seat.selected) {
    return `${base} bg-green-500 border-green-600 text-white scale-110 cursor-pointer`;
  }

  // available
  return `${base} ${getColorClass(seat.color)} cursor-pointer hover:opacity-80`;
};


 /*  const getSeatClassName = (seat) => {
    return "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 m-1 rounded-t border-2 cursor-pointer transition-all duration-200 flex justify-center items-center text-xs sm:text-sm font-bold border-blue-300 text-blue-800 bg-blue-200";

    if (seat.staus === "booked") {
      return `${baseClasss} bg-gray-400 border-gray-500 text-gray-600 cursor-not-allowed`;
    }

    if (seat.selected) {
      return `${baseClasss} bg-green--500 bordergreen-600 text-white transform scale-110`
    }

    return `${baseClasss} ${getColorClass(seat.solor)}`
  };
 */
  const handleSeatClick = (rowIndex, seatIndex) => {
    // to do
  }

  const renderSeatSection = (seatRow, startIndex, endIndex) => {
    return ( 
      <div className='flex'>
        {seatRow.slice(startIndex, endIndex).map((seat, index) => {
          return ( 
            <div 
              className={getSeatClassName(seat)} 
              key={seat.id}
              title={ `${seat.id} - ${
                getSeatType(seat.row)?.name || "Regular"
              } - ${currency}${seat.price} `}
               onClick={() => handleSeatClick(seat.row, startIndex + index)}
            >
                {" "}
                {startIndex + index + 1}
            </div>
          );
        })}
      </div>
    )
  };

  return (
    <div className='w-full text-center'>
      {/* tiltle */}
      <div className=' mt-10 max-w-6xl mx-auto bg-gray-900 rounded-lg shadow-lg p-6' >
          <h1 className=' text-5xl font-extrabold'>{title}</h1>
          <p className='mt-6 text-center text-2xl'>{subtitle}</p>         
      </div>
    
      {/* Screen */}
      <div>
        <div className='mx-auto w-[90%] h-4 bg-gray-300 mt-10 mb-2 rounded-2xl shadow-inner'/>
          <p className='text-center'>SCREEN</p>    
      </div>

      {/* Seat Map */}
      <div className='mb-6 overflow-x-auto'>
        <div className='flex flex-col items-center min-w-max mt-20 '>
          {seats.map((row, rowIndex) => {
            return (
              <div key={rowIndex} className='flex mt-3'>
                <span className='mt-2 h-8 w-8 text-center font-bold mr-4 text-white border-2 border-gray-500 bg-gray-800'>
                  {String.fromCharCode(65 + rowIndex)} 
                </span>

                {renderSeatSection(row, 0, layout.aislePosition)}

                {renderSeatSection(
                  row,
                  layout.aislePosition,
                  layout.setPerRow
                )}
              </div>
            );
          })}
        </div>
      </div>


      {/* Avalibility */}
      {/* Summary */}
      {/* Book button */}

    </div>
  )
}

export default CinemaSeatBooking
