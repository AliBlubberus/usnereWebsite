import RPi.GPIO as GPIO#
import subprocess
import time

SENSOR_PIN = 23

GPIO.setmode(GPIO.BCM)
GPIO.setup(SENSOR_PIN, GPIO.IN)

def callback(channel):
    global mytime
    print("Bewegung!", time.time())
    mytime = time.time()

try:
    GPIO.add_event_detect(SENSOR_PIN, GPIO.RISING, callback=callback)
    mytime = time.time()
    state = 'off'
    while True:
        diff = time.time() - mytime
        if (diff > 120) and state == 'on':
            state = 'off'
            print('Schalte aus')
            subprocess.run(['vcgencmd', 'display_power', '0'])
        elif (diff < 120) and state == 'off':
            state = 'on'
            print('Schalte ein')
            subprocess.run(['vcgencmd', 'display_power', '1'])
        time.sleep(0.1)

except KeyboardInterrupt:
    print("Beende")

GPIO.cleanup()

