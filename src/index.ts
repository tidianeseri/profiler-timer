/**
 * Profiler class to time execution in the code
 *
 * @export
 * @class Profiler
 */
export default class Profiler {
  private _startTime: [number, number] | undefined;
  private _endTime: [number, number] | undefined;
  private _interTime: [number, number] | undefined;
  private _reference: string;

  public get startTime() : [number, number] | undefined {
    return this._startTime;
  }
  public get endTime() : [number, number] | undefined {
    return this._endTime;
  }

  /**
   *Creates an instance of Profiler.
   * @param {string} reference String reference used to identify a profiler
   * @param {boolean} [start=false] True if profiler should start right away.
   * @memberof Profiler
   */
  constructor(reference: string, start: boolean = false) {
    this._reference = reference || '';
    this._startTime = undefined;
    this._endTime = undefined;

    if (start)
      this._startTime = process.hrtime();
  }

  /**
   * Print and format to console the time passed
   *
   * @private
   * @param {string} description A description to print
   * @param {[number, number]} time [seconds, milliseconds]
   * @memberof Profiler
   */
  private log(description: string, time: [number, number]) {
    console.log('%s | %s time: %ds %dms', this._reference, description, time[0], time[1] / 1000000);
  }

  /**
   * Show the full time and end the timer
   *
   * @memberof Profiler
   */
  showFullTime() {
    // End the profiler
    if (!this._endTime)
      this.end()
    
    if(this._endTime)
      this.log('Full', this._endTime);
    else
      console.error('_endTime is undefined')
  }

  /**
   * Show elapsed time since the start of the profiler
   *
   * @param {string} [desc] The description to show
   * @memberof Profiler
   */
  showLapTime(desc?: string) {
    this.log(desc || 'Lap', this.lap());
  }

  /**
   * Show elapsed time since the start of the intermediate profiler [profiler.interStart()]
   *
   * @param {string} [desc] The description to show
   * @param {boolean} [showLap] True if it should also show the time elapsed since the start of the profiler
   * @memberof Profiler
   */
  showInterTime(desc?: string, showLap?: boolean) {
    if (showLap)
      this.showLapTime(desc ? 'Lap ' + desc : desc);
    
    const subTime = this.interEnd();
    if (subTime)
      this.log(desc || 'Intermediate', subTime);
    else
      console.error('No intermediate timer started. Call subStart() first');
  }

  /**
   * Start the profiler
   *
   * @memberof Profiler
   */
  start(): void {
    this._startTime = process.hrtime();
    this._endTime = undefined;
  }

  /**
   * End the profiler
   *
   * @memberof Profiler
   */
  end(): void {
    if (!this._startTime) {
      console.error('You need to start the profiler first');
      return;
    }
    this._endTime = process.hrtime(this._startTime);
  }

  /**
   * Start an intermediate timer
   *
   * @memberof Profiler
   */
  interStart() {
    this._interTime = process.hrtime();
  }

  /**
   * End the intermediate timer
   *
   * @returns {([number, number] | undefined)}
   * @memberof Profiler
   */
  interEnd(): [number, number] | undefined {
    return this._interTime ? process.hrtime(this._interTime) : undefined;
  }

  /**
   * Return time elapsed since the start of the profiler
   *
   * @returns {[number, number]} Seconds and milliseconds elapsed since start of profiler
   * @memberof Profiler
   */
  lap(): [number, number] {
    return process.hrtime(this._startTime)
  }
}