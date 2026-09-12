import React from 'react';
import { Card } from '@/core/ui/card';
import { Feather } from 'lucide-react';

export interface GarmentConceptStoryProps {
  leadArtisan: string;
  conceptStory: string;
  collectionTheme: string;
}

export function GarmentConceptStory({ leadArtisan, conceptStory, collectionTheme }: GarmentConceptStoryProps) {
  return (
    <Card className="p-6 bg-sage-50/50 border-sage-200/60">
      <div className="flex items-center gap-2 text-xs uppercase font-medium tracking-wider text-sage-600 mb-2">
        <Feather className="w-3.5 h-3.5" />
        <span>Designer Concept Narrative &bull; {collectionTheme}</span>
      </div>
      <p className="text-xs text-editorial-muted italic mb-3">Conceived, drafted, and cut by {leadArtisan}</p>
      <p className="text-sm sm:text-base leading-relaxed text-editorial-text font-serif italic">{conceptStory}</p>
    </Card>
  );
}
