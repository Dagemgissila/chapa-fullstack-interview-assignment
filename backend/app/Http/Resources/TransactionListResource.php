<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'amount' => $this->amount,
            'type' => $this->type,
            'status' => $this->status,
            'currency' => $this->currency,
            'reference' => $this->reference,
            'payment_method' => $this->payment_method,
            'created_at' => $this->created_at->toDateTimeString(),
            "user" => new UserResource($this->whenLoaded("user"))
        ];
    }

}
