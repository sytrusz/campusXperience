import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';

const EventCard = ({
  id,
  title,
  date,
  time,
  location,
  category,
  attendees,
  description,
  image,
  onEdit,
  onDelete
}) => {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg" style={{ backgroundColor: '#C21807', color: '#F8F5F2', borderRadius: '12px', padding: '16px' }}>
      
      {/* Event Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <div className="absolute top-4 right-4">
          <span className="rounded-full bg-red-600 px-3 py-1 text-sm font-medium text-white">
            {category}
          </span>
        </div>
      </div>

      {/* Event Content */}
      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold">{title}</h3>
        
        {/* Event Details */}
        <div className="space-y-2">
          <div className="flex items-center">
            <Calendar className="mr-2 h-4 w-4" />
            <span className="text-sm">{date}</span>
            <Clock className="ml-4 mr-2 h-4 w-4" />
            <span className="text-sm">{time}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            <span className="text-sm">{location}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            <span className="text-sm">{attendees} attending</span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-3 text-sm">
          {description}
        </p>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-2">
          <button className="rounded border border-red-600 bg-transparent px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300" onClick={() => onEdit(id)}>
            Edit
          </button>
          <button className="rounded border border-red-600 bg-transparent px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300" onClick={() => onDelete(id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;d
