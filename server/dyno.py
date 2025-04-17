
import matplotlib.pyplot as plt
import numpy as np

rpm = np.linspace(1500, 6500, 100)
original_hk = 0.02 * (rpm - 1500) * np.exp(-0.0005 * (rpm - 3000)) + 100
tuned_hk = original_hk + 30
original_nm = 0.03 * (rpm - 1500) * np.exp(-0.0004 * (rpm - 3000)) + 200
tuned_nm = original_nm + 50

max_hk = np.max(tuned_hk)
max_hk_rpm = rpm[np.argmax(tuned_hk)]
max_nm = np.max(tuned_nm)
max_nm_rpm = rpm[np.argmax(tuned_nm)]

plt.style.use("dark_background")
fig, ax1 = plt.subplots(figsize=(10, 6))
ax1.plot(rpm, original_hk, 'deepskyblue', label='Original HK', linewidth=2)
ax1.plot(rpm, tuned_hk, 'red', label='Tuned HK', linewidth=2)
ax1.set_xlabel("RPM")
ax1.set_ylabel("Effekt (HK)", color="white")
ax1.tick_params(axis="y", labelcolor="white")
ax1.tick_params(axis="x", colors="white")
ax1.set_xlim(1500, 6500)

ax2 = ax1.twinx()
ax2.plot(rpm, original_nm, 'deepskyblue', linestyle='--', label='Original NM', linewidth=2)
ax2.plot(rpm, tuned_nm, 'red', linestyle='--', label='Tuned NM', linewidth=2)
ax2.set_ylabel("Vridmoment (Nm)", color="white")
ax2.tick_params(axis="y", labelcolor="white")

ax1.annotate(f"Max HK: {int(max_hk)}", xy=(max_hk_rpm, max_hk),
             xytext=(max_hk_rpm, max_hk + 10),
             arrowprops=dict(facecolor='white', shrink=0.05), color="white", ha="center")
ax2.annotate(f"Max NM: {int(max_nm)}", xy=(max_nm_rpm, max_nm),
             xytext=(max_nm_rpm, max_nm + 20),
             arrowprops=dict(facecolor='white', shrink=0.05), color="white", ha="center")

fig.tight_layout()
fig.suptitle("Dyno Chart", color="white", fontsize=16, y=1.03)
ax1.legend(loc="upper left", facecolor='black', framealpha=0.3)
ax2.legend(loc="upper right", facecolor='black', framealpha=0.3)
plt.grid(color='gray', linestyle='--', linewidth=0.5)
plt.savefig("server/data/dyno_chart_preview.png", dpi=150, bbox_inches="tight")
