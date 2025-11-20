document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/admin/orders")
    .then(res => res.json())
    .then(data => {
      console.log("Admin Orders:", data);

      const ordersTable = document.getElementById("orders-table");

      data.forEach(order => {

        const totalAmount = order.items && Array.isArray(order.items)
          ? order.items.reduce((sum, item) => {
              const price = Number(item.price) || 0;
              const qty = Number(item.qty) || 0;
              return sum + price * qty;
            }, 0)
          : 0;

        const payment =
          order.paymentMode ||
          order.payment_method ||
          order.paymentMethod ||
          order.payment ||
          "Not Provided";

        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${order._id}</td>
          <td>${order.address || "Unknown"}</td>
          <td>${order.items.map(i => `${i.name} x ${i.qty}`).join("<br>")}</td>
          <td>${totalAmount}</td>
          <td>${payment}</td>
          <td>${new Date(order.createdAt).toLocaleString()}</td>
        `;

        ordersTable.appendChild(row);
      });
    })
    .catch(err => console.error("Admin Fetch Error:", err));
});










