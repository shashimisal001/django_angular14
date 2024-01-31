class Helper:
    @staticmethod
    def get_order_summary(data):
        summary = {}

        temp_list = [row["rate"] for row in data]
        summary.update({"total_rate": sum(temp_list)})

        temp_list = [row["discount_data"]["total_discount"] for row in data]
        summary.update({"total_discount": sum(temp_list)})

        temp_list = [row["discount_data"]["total_discounted_rate"] for row in data]
        summary.update({"total_discounted_rate": sum(temp_list)})

        temp_list = [row["gst_data"]["total_gst_amt"] for row in data]
        summary.update({"total_gst": round(sum(temp_list), 2)})

        temp_list = [row["total_with_gst"] for row in data]
        summary.update({"total_with_gst": round(sum(temp_list, 2))})

        return summary