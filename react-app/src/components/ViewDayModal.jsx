import React from 'react';

const ViewDayModal = ({ isOpen, onClose, dateStr, events, onEditClick }) => {
  if (!isOpen) return null;

  // Format date nicely (e.g., "Oct 8, 2024")
  let formattedDate = dateStr;
  try {
    // split to avoid timezone off-by-one errors from parsing YYYY-MM-DD
    const [y, m, d] = dateStr.split('-');
    const dateObj = new Date(y, m - 1, d);
    formattedDate = dateObj.toLocaleDateString('default', { month: 'long', day: 'numeric', year: 'numeric' });
  } catch (e) {}

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-[#0e0e0e]/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-[#1c1b1b] border border-[#4d4635]/20 rounded-xl w-[calc(100%-2rem)] sm:w-full max-w-sm relative z-10 shadow-2xl flex flex-col max-h-[80vh]">
        <div className="flex items-center justify-between p-6 border-b border-outline-variant/10 shrink-0">
          <h2 className="text-xl font-serif text-on-surface">{formattedDate}</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-error transition-colors outline-none">
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto space-y-3 flex-1 disable-scrollbar">
          {events.length === 0 ? (
            <div className="text-center py-8 text-on-surface-variant/50">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-50">event_busy</span>
              <p className="text-sm">No events scheduled.</p>
            </div>
          ) : (
            events.map((evt, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-lg border-l-[4px] relative ${
                  evt.type === 'tournament' ? 'border-[#f2ca50] bg-primary/10' : 
                  evt.type === 'workshop' ? 'border-[#e5e2e1] bg-[#e5e2e1]/10' : 
                  'border-[#60a5fa] bg-[#60a5fa]/10'
                }`}
              >
                <div className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                  evt.type === 'tournament' ? 'text-primary' :
                  evt.type === 'workshop' ? 'text-on-surface' :
                  'text-blue-400'
                }`}>
                  {evt.title}
                </div>
                {evt.type === 'user' && (
                  <button 
                    onClick={() => {
                      onClose();
                      if(onEditClick) onEditClick(evt);
                    }}
                    className="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors outline-none"
                    title="Edit Match"
                  >
                    <span className="material-symbols-outlined text-[16px]">edit</span>
                  </button>
                )}
                <div className="space-y-1.5">
                    <div className="text-xs text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> {evt.time}
                    </div>
                    <div className="text-xs text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-[14px]">location_on</span> {evt.location}
                    </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewDayModal;
