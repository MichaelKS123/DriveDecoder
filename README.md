# DriveDecoder

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey.svg)

**DriveDecoder** is a professional USB forensics analysis tool designed to detect and analyze USB device insertions and removals from Windows Event Logs. Built for cybersecurity professionals, digital forensics investigators, and IT administrators.

**Author**: Michael Semera  
**Purpose**: Portfolio Project / Forensics Analysis Tool

---

## 🎯 Features

### Core Functionality
- **USB Event Detection** - Automatically scans Windows Event Logs for USB device activity
- **Comprehensive Device Tracking** - Captures vendor, model, serial numbers, and drive letters
- **Insertion/Removal Analysis** - Distinguishes between device connection and disconnection events
- **User Attribution** - Identifies which user account was active during USB events
- **Timeline Visualization** - Chronological display of all USB activities with precise timestamps

### Analysis Tools
- **Real-time Statistics Dashboard** - Overview of total events, insertions, removals, and unique devices
- **Advanced Filtering** - Filter by event type (insertion/removal) or search across all device metadata
- **CSV Export** - Export forensic data for reporting, documentation, or further analysis
- **Event Log Integration** - Works with Windows Event IDs 20001 (insertion) and 20003 (removal)

### User Interface
- Modern, professional dashboard design
- Responsive layout for various screen sizes
- Color-coded event indicators (green for insertions, red for removals)
- Intuitive search and filter controls

---

## 🔧 Technology Stack

- **Frontend Framework**: React 18.x
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Target Platform**: Windows 10/11
- **Event Sources**: Windows Event Logs (System)

---

## 📋 System Requirements

### Minimum Requirements
- Windows 10 (1809) or later
- Administrative privileges for Event Log access
- Modern web browser (Chrome, Edge, Firefox)
- 4GB RAM
- 100MB disk space

### Recommended Requirements
- Windows 11
- 8GB RAM or more
- SSD storage for faster log analysis

---

## 🚀 Installation

### Option 1: Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/drivedecoder.git
   cd drivedecoder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

### Option 2: Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the build folder** to your web server or hosting platform

---

## 📖 Usage Guide

### Basic Workflow

1. **Launch DriveDecoder** - Open the application in your web browser

2. **Scan for USB Events** - Click the "Scan USB Events" button to analyze Windows Event Logs

3. **Review Results** - Examine the dashboard statistics and detailed event timeline

4. **Filter Events** - Use the filter dropdown to show only insertions or removals

5. **Search Devices** - Enter vendor name, model, or serial number in the search box

6. **Export Data** - Click "Export to CSV" to download a complete forensic report

### Understanding Event Data

Each USB event contains:
- **Timestamp**: Exact date and time of the event
- **Event Type**: INSERTION or REMOVAL
- **Device Information**: Vendor and model name
- **Serial Number**: Unique device identifier
- **Drive Letter**: Assigned Windows drive letter (e.g., E:, F:)
- **User Account**: Windows user who was logged in during the event

---

## 🔍 Windows Event Log Details

### Event IDs Analyzed

| Event ID | Description | Log Source |
|----------|-------------|------------|
| 20001 | USB Device Insertion | Microsoft-Windows-DriverFrameworks-UserMode |
| 20003 | USB Device Removal | Microsoft-Windows-DriverFrameworks-UserMode |

### Event Log Locations
- **Primary Source**: `System` Event Log
- **Secondary Sources**: `Setup` and `Application` logs (for comprehensive analysis)

### Required Permissions
- Administrator access or specific Event Log read permissions
- Security policy: "Manage auditing and security log" may be required

---

## 📊 CSV Export Format

Exported CSV files include the following columns:

```csv
Timestamp, Event Type, Vendor, Model, Serial Number, Drive Letter, User, Event ID
2024-11-12T14:23:15.000Z, insertion, SanDisk, Cruzer Blade, AA011234567890, E:, WORKSTATION\User1, 20001
```

---

## 🛡️ Security & Privacy Considerations

### Data Handling
- All analysis is performed locally on the host machine
- No data is transmitted to external servers
- Exported CSV files should be secured with appropriate access controls

### Forensic Integrity
- DriveDecoder is a read-only analysis tool
- Does not modify Windows Event Logs
- Does not alter system configurations
- Suitable for forensic investigations requiring evidence preservation

### Legal Compliance
- Ensure you have proper authorization before analyzing system logs
- Follow organizational policies for digital forensics
- Maintain chain of custody for exported reports

---

## 🗺️ Roadmap

### Version 1.1 (Planned)
- [ ] Real-time USB monitoring mode
- [ ] Integration with Windows Event Log API (native)
- [ ] Device whitelist/blacklist management
- [ ] Email alerts for unauthorized USB devices

### Version 2.0 (Future)
- [ ] Multi-machine analysis (network deployment)
- [ ] Advanced analytics and pattern recognition
- [ ] Integration with SIEM platforms
- [ ] PDF report generation with charts

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Michael Semera

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 📞 Contact & Support

**Author**: Michael Semera  

- 💼 LinkedIn: [Michael Semera](https://www.linkedin.com/in/michael-semera-586737295/)
- 🐙 GitHub: [@MichaelKS123](https://github.com/MichaelKS123)
- 📧 Email: michaelsemera15@gmail.com

---

## 🙏 Acknowledgments

- Windows Event Log documentation by Microsoft
- Digital forensics community for best practices
- Open-source contributors to React and Tailwind CSS

---

## ⚠️ Disclaimer

This tool is provided for educational and professional forensic analysis purposes. Users are responsible for ensuring compliance with applicable laws, regulations, and organizational policies. Always obtain proper authorization before analyzing systems or data that you do not own or have explicit permission to examine.

---

**Built with 💙 by Michael Semera**