export class PaymentChannel {
  private channel: BroadcastChannel;
  private callbacks: ((data: any) => void)[] = [];

  constructor(channelName: string = 'payment_channel') {
    this.channel = new BroadcastChannel(channelName);
    this.initializeListener();
  }

  private initializeListener() {
    this.channel.onmessage = (event) => {
      this.callbacks.forEach(callback => callback(event.data));
    };
  }

  public subscribe(callback: (data: any) => void) {
    this.callbacks.push(callback);
  }

  public unsubscribe(callback: (data: any) => void) {
    this.callbacks = this.callbacks.filter(cb => cb !== callback);
  }

  public close() {
    this.channel.close();
  }
} 