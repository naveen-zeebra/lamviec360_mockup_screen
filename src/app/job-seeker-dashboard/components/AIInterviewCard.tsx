'use client';
import React from 'react';
import { Sparkles, Lock } from 'lucide-react';

interface AIInterviewCardProps {
  onOpenModal: () => void;
}

export default function AIInterviewCard({ onOpenModal }: AIInterviewCardProps) {
  return (
    <div className="coming-soon-bg rounded-xl p-5 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={15} className="text-yellow-400" />
          <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider">Sắp Ra Mắt</span>
        </div>
        <h3 className="font-bold text-white text-sm mb-1.5">AI Interview Preparation</h3>
        <p className="text-xs text-white/70 leading-relaxed mb-4">
          Luyện tập phỏng vấn với AI được cá nhân hóa theo vị trí của bạn.
        </p>
        <button
          onClick={onOpenModal}
          className="flex items-center gap-2 px-3 py-2 bg-yellow-400 text-foreground text-xs font-bold rounded-lg hover:bg-yellow-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 active:scale-95"
          aria-label="AI Interview Preparation - Coming Soon"
        >
          <Lock size={13} />
          Tìm Hiểu Thêm
        </button>
      </div>
    </div>
  );
}