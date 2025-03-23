import { sumaryfn } from "../../utils/AiConfig.js"
import { ApiResponse } from "../../utils/ApiResponse.js";

export const summaryGenertorController = async (req, res) => {

  const { prompt } = req.body
  try {

    const response = await sumaryfn(prompt)

    return res
      .status(200)
      .json(
        new ApiResponse(200, { response }, "Summary AI generted")
      );
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }

}