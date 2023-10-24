class Exception extends Error {
  args: string[];
  status: number;
  constructor(status: number, message: string, ...args: string[]) {
    super(message);
    this.status = status;
    this.args = args;
  }
}

export default Exception;
