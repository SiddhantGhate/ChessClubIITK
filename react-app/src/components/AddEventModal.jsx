import { useState, useEffect } from 'react';

const AddEventModal = ({ isOpen, onClose, onAddEvent, initialDate = '', editEvent = null, onEditEvent = null, onDeleteEvent = null }) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (isOpen) {
      if (editEvent) {
        setTitle(editEvent.title || '');
        setTime(editEvent.time || '');
        setLocation(editEvent.location || '');
        setDate(editEvent.dateStr || editEvent.date || '');
      } else {
        setTitle('');
        setTime('');
        setLocation('');
        setDate(initialDate);
      }
    }
  }, [initialDate, isOpen, editEvent]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date) return;
    
    if (editEvent && onEditEvent) {
      onEditEvent({
        ...editEvent,
        title,
        time: time || 'TBD',
        location: location || 'TBD',
        dateStr: date,
        date: date
      });
    } else {
      onAddEvent({
        id: `evt_${Date.now()}`,
        type: 'user', // user events
        title,
        time: time || 'TBD',
        location: location || 'TBD',
        dateStr: date,
        date: date
      });
    }
    
    setTitle('');
    setTime('');
    setLocation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-[#0e0e0e]/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-[#1c1b1b] border border-[#4d4635]/20 rounded-xl p-6 sm:p-8 w-[calc(100%-2rem)] sm:w-full max-w-md relative z-10 shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-serif text-on-surface">{editEvent ? 'Edit Match' : 'Schedule Match'}</h2>
          <button onClick={onClose} className="text-on-surface-variant hover:text-error transition-colors outline-none">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Match Title</label>
            <input 
              type="text" 
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Blitz vs Siddharth"
              className="w-full bg-[#131313] border border-[#4d4635]/30 rounded-lg px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Date</label>
              <input 
                type="date" 
                required
                value={date}
                onChange={e => setDate(e.target.value)}
                className="w-full bg-[#131313] border border-[#4d4635]/30 rounded-lg px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Time</label>
              <input 
                type="time" 
                value={time}
                onChange={e => setTime(e.target.value)}
                className="w-full bg-[#131313] border border-[#4d4635]/30 rounded-lg px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors [color-scheme:dark]"
              />
            </div>
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">Location</label>
            <input 
              type="text" 
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="e.g. Hall 5 Reading Room"
              className="w-full bg-[#131313] border border-[#4d4635]/30 rounded-lg px-4 py-2 text-sm text-on-surface focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <div className="pt-4 flex items-center justify-between gap-4">
             {editEvent && (
                <button
                  type="button"
                  onClick={() => {
                    if(onDeleteEvent) onDeleteEvent(editEvent.id);
                    onClose();
                  }}
                  className="px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-[#ef4444] border border-[#ef4444]/30 hover:bg-[#ef4444]/10 rounded-lg transition-colors outline-none h-[48px]"
                >
                  Delete
                </button>
             )}
            <button 
              type="submit"
              className={`flex-1 ${editEvent ? 'bg-primary text-on-primary' : 'bg-gradient-to-r from-[#f2ca50] to-[#d4af37] text-[#3c2f00]'} font-bold py-3 rounded-lg shadow-lg hover:scale-[1.02] transition-transform outline-none h-[48px]`}
            >
              {editEvent ? 'Save Changes' : 'Add to Ledger'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEventModal;
