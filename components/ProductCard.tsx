
import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <>
      <div className="group relative">
        <div className="aspect-[3/4] overflow-hidden bg-gray-100 relative">
          {product.tag && (
            <span className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-black border border-black shadow-sm">
              {product.tag}
            </span>
          )}
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
          />
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 w-[80%]">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-white py-3 text-xs font-bold uppercase tracking-widest text-black shadow-lg hover:bg-black hover:text-white transition-colors"
            >
              Quick View +
            </button>
          </div>
        </div>
        <div className="mt-4 flex justify-between">
          <div className="max-w-[70%]">
            <h3 
              className="text-sm text-gray-700 font-medium cursor-pointer hover:text-black hover:underline transition-all underline-offset-4"
              onClick={() => setIsModalOpen(true)}
            >
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500 uppercase tracking-tighter text-[11px] flex items-center">
              {product.category}
              <i className="fa-solid fa-leaf ml-2 text-[8px] text-green-200"></i>
            </p>
          </div>
          <p className="text-sm font-semibold text-gray-900">${product.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Product Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={() => setIsModalOpen(false)}
          ></div>
          
          {/* Modal Container */}
          <div className="relative bg-white w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 fade-in duration-300 border border-gray-100">
            {/* Decorative Flower Icon */}
            <div className="absolute -top-4 -left-4 text-pink-50/30 text-8xl z-0 pointer-events-none">
              <i className="fa-solid fa-seedling rotate-45"></i>
            </div>

            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 z-20 text-gray-400 hover:text-black transition-colors"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>

            <div className="flex flex-col md:flex-row relative z-10">
              {/* Image Side */}
              <div className="w-full md:w-1/2 aspect-[4/5] md:aspect-auto">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info Side */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white/50 backdrop-blur-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-300 mb-2 flex items-center">
                  <i className="fa-solid fa-spa mr-2"></i>
                  {product.category} Selection
                </span>
                <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">{product.name}</h2>
                <p className="text-xl font-medium text-gray-900 mb-6">${product.price.toFixed(2)}</p>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black border-b border-gray-100 pb-1 mb-3">
                      Select Size
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`min-w-[44px] h-[44px] text-xs font-bold border transition-all duration-200 ${
                            selectedSize === size
                              ? 'bg-black text-white border-black shadow-md'
                              : 'bg-white text-gray-400 border-gray-200 hover:border-black hover:text-black'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-widest text-black border-b border-gray-100 pb-1 mb-3">
                      Description
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed italic">
                      {product.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    disabled={!selectedSize}
                    className={`w-full py-4 text-xs font-bold uppercase tracking-widest transition-all shadow-lg ${
                      selectedSize 
                        ? 'bg-black text-white hover:bg-gray-800' 
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {selectedSize ? `Add Size ${selectedSize} to Bag` : 'Select a Size'}
                  </button>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-white border border-gray-200 text-gray-400 py-3 text-[10px] font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all"
                  >
                    Continue Browsing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
