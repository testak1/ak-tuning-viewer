import React from 'react';
import PropTypes from 'prop-types';

export default function CardItem({ title, image }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow">
      {image && <img src={image} alt={title} className="w-full h-32 object-cover" />}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
    </div>
  );
}

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
};
