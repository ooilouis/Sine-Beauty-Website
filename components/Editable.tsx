
import React from 'react';
import { useContent } from '../contexts/ContentContext';
import { Pencil, Image as ImageIcon } from 'lucide-react';

interface EditableTextProps {
  id: string; // The key in the content database
  className?: string;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export const EditableText: React.FC<EditableTextProps> = ({ id, className, tag = 'div' }) => {
  const { content, updateContent, isAdmin } = useContent();
  // @ts-ignore
  const value = content[id] || "Missing Content";

  if (isAdmin) {
    return (
      <div className="relative group inline-block w-full">
        <input
            type="text"
            value={value}
            onChange={(e) => updateContent(id, e.target.value)}
            className={`w-full bg-yellow-100/50 border-b-2 border-yellow-400 focus:outline-none focus:bg-white text-black px-1 ${className}`}
        />
        <span className="absolute -top-3 -right-3 bg-yellow-400 text-black p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <Pencil size={12} />
        </span>
      </div>
    );
  }

  const Tag = tag as any;
  return <Tag className={className}>{value}</Tag>;
};

interface EditableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    id: string;
}

export const EditableImage: React.FC<EditableImageProps> = ({ id, className, alt, ...props }) => {
    const { content, updateContent, isAdmin } = useContent();
    // @ts-ignore
    const src = content[id] || "https://via.placeholder.com/150";

    if (isAdmin) {
        return (
            <div className="relative group w-full h-full">
                <img src={src} alt={alt} className={`opacity-80 ${className}`} {...props} />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ImageIcon className="text-white mb-2" />
                    <input 
                        type="text" 
                        value={src}
                        onChange={(e) => updateContent(id, e.target.value)}
                        placeholder="Paste Image URL"
                        className="text-xs p-2 rounded w-3/4 text-black"
                        onClick={(e) => e.stopPropagation()} 
                    />
                </div>
                <div className="absolute top-2 right-2 bg-yellow-400 text-xs font-bold px-2 py-1 rounded">
                    EDIT IMG
                </div>
            </div>
        )
    }

    return <img src={src} alt={alt} className={className} {...props} />;
}
