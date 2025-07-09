<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserTransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "user_id" => $this->user_id,
            "currency" => $this->currency,
            "amount" => $this->amount,
            "status" => $this->status,
            "reference" => $this->reference,
            "payment_method" => $this->payment_method,
            "created_at" => $this->created_at,
            "updated_at" => $this->updated_at
        ];

    }
}
