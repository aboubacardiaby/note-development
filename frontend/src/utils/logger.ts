type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  userAgent?: string;
  url?: string;
}

class Logger {
  private isDevelopment = import.meta.env.DEV;
  private logBuffer: LogEntry[] = [];
  private readonly maxBufferSize = 100;

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: Record<string, any>
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };
  }

  private addToBuffer(entry: LogEntry) {
    this.logBuffer.push(entry);
    if (this.logBuffer.length > this.maxBufferSize) {
      this.logBuffer.shift();
    }
  }

  private formatMessage(entry: LogEntry): string {
    const time = new Date(entry.timestamp).toLocaleTimeString();
    let msg = `[${time}] [${entry.level.toUpperCase()}] ${entry.message}`;
    if (entry.context) {
      msg += ` ${JSON.stringify(entry.context)}`;
    }
    return msg;
  }

  debug(message: string, context?: Record<string, any>) {
    const entry = this.createLogEntry('debug', message, context);
    this.addToBuffer(entry);

    if (this.isDevelopment) {
      console.debug(this.formatMessage(entry), context || '');
    }
  }

  info(message: string, context?: Record<string, any>) {
    const entry = this.createLogEntry('info', message, context);
    this.addToBuffer(entry);

    if (this.isDevelopment) {
      console.info(this.formatMessage(entry), context || '');
    }
  }

  warn(message: string, context?: Record<string, any>) {
    const entry = this.createLogEntry('warn', message, context);
    this.addToBuffer(entry);

    console.warn(this.formatMessage(entry), context || '');
  }

  error(message: string, context?: Record<string, any>) {
    const entry = this.createLogEntry('error', message, context);
    this.addToBuffer(entry);

    console.error(this.formatMessage(entry), context || '');

    // In production, you could send critical errors to a logging service
    if (!this.isDevelopment) {
      this.sendToBackend(entry);
    }
  }

  private async sendToBackend(entry: LogEntry) {
    try {
      // This is a placeholder - implement actual backend logging endpoint
      // await fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(entry),
      // });
    } catch (error) {
      // Silently fail to avoid infinite error loops
      console.error('Failed to send log to backend:', error);
    }
  }

  getRecentLogs(): LogEntry[] {
    return [...this.logBuffer];
  }

  clearLogs() {
    this.logBuffer = [];
  }
}

// Export singleton instance
export const logger = new Logger();
export default logger;
