from flask import Flask, send_file, request
import matplotlib.pyplot as plt
import io

app = Flask(__name__)

@app.route('/dyno.png')
def dyno_chart():
    brand = request.args.get('brand')
    model = request.args.get('model')
    year = request.args.get('year')
    motor = request.args.get('motor')

    # Dummy data for illustration
    rpm = [1000, 2000, 3000, 4000, 5000, 6000]
    hp = [80, 120, 160, 200, 230, 220]
    torque = [200, 250, 300, 310, 290, 270]

    fig, ax1 = plt.subplots()

    ax1.plot(rpm, hp, label='Hästkrafter', linewidth=2)
    ax1.set_xlabel('RPM')
    ax1.set_ylabel('Hästkrafter')
    ax1.grid(True)
    ax1.legend(loc='upper left')

    ax2 = ax1.twinx()
    ax2.plot(rpm, torque, 'r--', label='Vridmoment', linewidth=2)
    ax2.set_ylabel('Vridmoment (Nm)')
    ax2.legend(loc='upper right')

    buf = io.BytesIO()
    plt.title(f'Dynograf: {brand} {model} {year} {motor}')
    fig.tight_layout()
    plt.savefig(buf, format='png')
    plt.close(fig)
    buf.seek(0)
    return send_file(buf, mimetype='image/png')
