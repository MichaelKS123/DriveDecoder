import React, { useState } from 'react';
import { HardDrive, Search, Download, Calendar, Clock, AlertCircle, CheckCircle, XCircle, Filter } from 'lucide-react';

const DriveDecoder = () => {
  const [events, setEvents] = useState([]);
  const [isScanning, setIsScanning] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    insertions: 0,
    removals: 0,
    devices: 0
  });

  // Simulated USB event data structure based on Windows Event Log analysis
  const generateSampleData = () => {
    const devices = [
      { vendor: 'SanDisk', model: 'Cruzer Blade', serial: 'AA011234567890' },
      { vendor: 'Kingston', model: 'DataTraveler', serial: 'KS981234ABCD' },
      { vendor: 'Samsung', model: 'USB 3.0 Flash', serial: 'SM771234XYZ' },
      { vendor: 'Western Digital', model: 'My Passport', serial: 'WD556789PQRS' }
    ];

    const eventTypes = ['insertion', 'removal'];
    const sampleEvents = [];
    const now = new Date();

    for (let i = 0; i < 25; i++) {
      const device = devices[Math.floor(Math.random() * devices.length)];
      const eventType = eventTypes[Math.floor(Math.random() * eventTypes.length)];
      const hoursAgo = Math.floor(Math.random() * 720); // Random time within last 30 days
      const timestamp = new Date(now - hoursAgo * 60 * 60 * 1000);

      sampleEvents.push({
        id: `evt-${Date.now()}-${i}`,
        eventType,
        timestamp,
        device: {
          vendor: device.vendor,
          model: device.model,
          serialNumber: device.serial,
          deviceClass: 'Mass Storage',
          volumeName: `USB_${device.vendor.toUpperCase()}`,
          driveLetter: String.fromCharCode(69 + Math.floor(Math.random() * 4)) + ':'
        },
        eventLog: {
          eventId: eventType === 'insertion' ? 20001 : 20003,
          source: 'Microsoft-Windows-DriverFrameworks-UserMode',
          logName: 'System'
        },
        user: `WORKSTATION\\User${Math.floor(Math.random() * 3) + 1}`
      });
    }

    return sampleEvents.sort((a, b) => b.timestamp - a.timestamp);
  };

  const scanForUSBEvents = async () => {
    setIsScanning(true);
    
    // Simulate scanning Windows Event Logs
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const scannedEvents = generateSampleData();
    setEvents(scannedEvents);

    // Calculate statistics
    const uniqueDevices = new Set(scannedEvents.map(e => e.device.serialNumber));
    setStats({
      total: scannedEvents.length,
      insertions: scannedEvents.filter(e => e.eventType === 'insertion').length,
      removals: scannedEvents.filter(e => e.eventType === 'removal').length,
      devices: uniqueDevices.size
    });

    setIsScanning(false);
  };

  const exportToCSV = () => {
    const headers = ['Timestamp', 'Event Type', 'Vendor', 'Model', 'Serial Number', 'Drive Letter', 'User', 'Event ID'];
    const rows = filteredEvents.map(e => [
      e.timestamp.toISOString(),
      e.eventType,
      e.device.vendor,
      e.device.model,
      e.device.serialNumber,
      e.device.driveLetter,
      e.user,
      e.eventLog.eventId
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `usb-forensics-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const filteredEvents = events.filter(event => {
    const matchesFilter = filterType === 'all' || event.eventType === filterType;
    const matchesSearch = searchTerm === '' || 
      event.device.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatTimestamp = (date) => {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <HardDrive className="w-10 h-10 text-blue-400" />
            <h1 className="text-4xl font-bold">DriveDecoder</h1>
          </div>
          <p className="text-slate-300 text-sm">USB Forensics Analysis Tool</p>
          <p className="text-slate-400 text-xs mt-1">by Michael Semera</p>
        </div>

        {/* Control Panel */}
        <div className="bg-slate-800/50 backdrop-blur rounded-lg p-6 mb-6 border border-slate-700">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <button
              onClick={scanForUSBEvents}
              disabled={isScanning}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Search className="w-5 h-5" />
              {isScanning ? 'Scanning Event Logs...' : 'Scan USB Events'}
            </button>

            {events.length > 0 && (
              <button
                onClick={exportToCSV}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Download className="w-5 h-5" />
                Export to CSV
              </button>
            )}
          </div>
        </div>

        {/* Statistics Dashboard */}
        {events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Total Events</p>
                  <p className="text-3xl font-bold text-blue-400">{stats.total}</p>
                </div>
                <AlertCircle className="w-10 h-10 text-blue-400 opacity-50" />
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Insertions</p>
                  <p className="text-3xl font-bold text-green-400">{stats.insertions}</p>
                </div>
                <CheckCircle className="w-10 h-10 text-green-400 opacity-50" />
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Removals</p>
                  <p className="text-3xl font-bold text-red-400">{stats.removals}</p>
                </div>
                <XCircle className="w-10 h-10 text-red-400 opacity-50" />
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4 border border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Unique Devices</p>
                  <p className="text-3xl font-bold text-purple-400">{stats.devices}</p>
                </div>
                <HardDrive className="w-10 h-10 text-purple-400 opacity-50" />
              </div>
            </div>
          </div>
        )}

        {/* Filters and Search */}
        {events.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-4 mb-6 border border-slate-700">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-slate-400" />
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm"
                >
                  <option value="all">All Events</option>
                  <option value="insertion">Insertions Only</option>
                  <option value="removal">Removals Only</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search by vendor, model, or serial..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* Events List */}
        {events.length > 0 && (
          <div className="bg-slate-800/50 backdrop-blur rounded-lg border border-slate-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Timestamp</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Event</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Device</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Serial Number</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">Drive</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold">User</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700">
                  {filteredEvents.map((event) => (
                    <tr key={event.id} className="hover:bg-slate-700/30 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{formatTimestamp(event.timestamp)}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${
                          event.eventType === 'insertion' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {event.eventType === 'insertion' ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {event.eventType.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          <div className="font-semibold text-white">{event.device.vendor}</div>
                          <div className="text-slate-400 text-xs">{event.device.model}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <code className="text-xs bg-slate-900/50 px-2 py-1 rounded text-blue-300">
                          {event.device.serialNumber}
                        </code>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-mono text-purple-400">{event.device.driveLetter}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-slate-300">{event.user}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {events.length === 0 && !isScanning && (
          <div className="bg-slate-800/50 backdrop-blur rounded-lg p-12 text-center border border-slate-700">
            <HardDrive className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-300 mb-2">No USB Events Scanned</h3>
            <p className="text-slate-400 mb-6">Click "Scan USB Events" to analyze Windows Event Logs for USB device activity</p>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-700">
          <div className="text-center text-sm text-slate-400">
            <p className="mb-2">DriveDecoder analyzes Windows Event Logs (Event IDs 20001, 20003) to detect USB device insertions and removals</p>
            <p className="text-xs text-slate-500">Forensics analysis requires appropriate administrative privileges and system access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriveDecoder;